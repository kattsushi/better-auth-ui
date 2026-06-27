import {
  type OrganizationAuthClient,
  organizationQueryKeys,
  type SetActiveOrganizationOptions,
  type SetActiveOrganizationParams,
  setActiveOrganizationOptions
} from "@better-auth-ui/core/plugins/organization"
import { useMutation, useQueryClient } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"
import { useListOrganizations } from "../queries"

type SetActiveOrganizationVariables<
  TAuthClient extends OrganizationAuthClient
> = SetActiveOrganizationParams<TAuthClient> & {
  organizationId?: string | null
  organizationSlug?: string
}

export function useSetActiveOrganization<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: SetActiveOrganizationOptions<TAuthClient>
) {
  const session = useSession(authClient)
  const queryClient = useQueryClient()
  const userId = () =>
    (session.data as { user?: { id?: string } } | undefined)?.user?.id
  const organizationsQuery = useListOrganizations(authClient)

  return useMutation(() => ({
    ...setActiveOrganizationOptions(authClient, userId()),
    ...options,
    onMutate: async (
      variables: SetActiveOrganizationVariables<TAuthClient>
    ) => {
      // Cancel any outgoing refetches across every slug-partitioned
      // active-organization cache entry so they don't overwrite our
      // optimistic update.
      await queryClient.cancelQueries({
        queryKey: organizationQueryKeys.activeOrganizations(userId())
      })

      // Snapshot every slug-partitioned variant so the rollback hits
      // whichever cache entry the UI is actually subscribed to.
      const previousOrganizations = queryClient.getQueriesData({
        queryKey: organizationQueryKeys.activeOrganizations(userId())
      })

      // Optimistically update to the new value
      if (variables?.organizationId === null) {
        queryClient.setQueriesData(
          { queryKey: organizationQueryKeys.activeOrganizations(userId()) },
          null
        )

        return { previousOrganizations }
      }

      const newOrganization = organizationsQuery.data?.find(
        (org: { id?: string; slug?: string }) =>
          (variables?.organizationId !== undefined &&
            org.id === variables.organizationId) ||
          (variables?.organizationSlug !== undefined &&
            org.slug === variables.organizationSlug)
      )

      if (newOrganization) {
        queryClient.setQueriesData(
          { queryKey: organizationQueryKeys.activeOrganizations(userId()) },
          newOrganization
        )
      }

      return { previousOrganizations }
    },
    // If the mutation fails, use the result returned from onMutate to roll back
    onError: (_error, _variables, onMutateResult) => {
      const previousOrganizations = onMutateResult?.previousOrganizations

      if (previousOrganizations?.length) {
        for (const [queryKey, data] of previousOrganizations) {
          queryClient.setQueryData(queryKey, data)
        }
      }
    },
    // Always refetch after error or success — invalidate every
    // slug-partitioned variant via the broader prefix.
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.activeOrganizations(userId())
      })
    }
  }))
}
