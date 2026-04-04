// Zaidan UI Components - Main Export File
// Barrel file with all component exports organized by category

// ============================================
// UI Primitives
// ============================================

// Avatar
export {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps
} from "@/components/ui/avatar"
// Button
export {
  Button,
  type ButtonProps,
  buttonVariants
} from "@/components/ui/button"
// Card
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  type CardProps,
  CardTitle
} from "@/components/ui/card"
// Checkbox
export { Checkbox, type CheckboxProps } from "@/components/ui/checkbox"
// Dropdown Menu
export {
  DropdownMenu,
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuItem,
  type DropdownMenuItemProps,
  type DropdownMenuProps,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
// Field
export {
  Field,
  FieldDescription,
  type FieldDescriptionProps,
  FieldError,
  type FieldErrorProps,
  FieldGroup,
  type FieldGroupProps,
  FieldLabel,
  type FieldLabelProps,
  FieldLegend,
  type FieldLegendProps,
  type FieldProps
} from "@/components/ui/field"
// Input
export { Input, type InputProps } from "@/components/ui/input"
// Label
export { Label, type LabelProps } from "@/components/ui/label"
// Radio Group
export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
  type RadioGroupProps
} from "@/components/ui/radio-group"
// Select
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  type SelectProps,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
// Separator
export { Separator, type SeparatorProps } from "@/components/ui/separator"
// Skeleton
export { Skeleton, type SkeletonProps } from "@/components/ui/skeleton"
// Spinner
export { Spinner, type SpinnerProps } from "@/components/ui/spinner"

// Tabs
export {
  Tabs,
  TabsContent,
  type TabsContentProps,
  TabsList,
  type TabsListProps,
  type TabsProps,
  TabsTrigger,
  type TabTriggerProps
} from "@/components/ui/tabs"
// Textarea
export { Textarea, type TextareaProps } from "@/components/ui/textarea"

// ============================================
// Auth Components
// ============================================

// Auth Wrapper
export { Auth, type AuthProps } from "@/components/auth/auth"

// Auth Provider
export {
  AuthProvider,
  type AuthProviderProps
} from "@/components/auth/auth-provider"
// Forgot Password
export {
  ForgotPassword,
  type ForgotPasswordProps
} from "@/components/auth/forgot-password"
// Magic Link
export { MagicLink, type MagicLinkProps } from "@/components/auth/magic-link"
// Magic Link Button
export {
  MagicLinkButton,
  type MagicLinkButtonProps
} from "@/components/auth/magic-link-button"

// Provider Buttons
export {
  ProviderButtons,
  type ProviderButtonsProps,
  type SocialLayout
} from "@/components/auth/provider-buttons"
// Reset Password
export {
  ResetPassword,
  type ResetPasswordProps
} from "@/components/auth/reset-password"
// Sign In
export { SignIn, type SignInProps } from "@/components/auth/sign-in"
// Sign Out
export { SignOut, type SignOutProps } from "@/components/auth/sign-out"
// Sign Up
export { SignUp, type SignUpProps } from "@/components/auth/sign-up"

// ============================================
// User Components
// ============================================

// Switch Account Item
export {
  SwitchAccountItem,
  type SwitchAccountItemProps
} from "@/components/user/switch-account-item"
// Switch Account Menu
export {
  SwitchAccountMenu,
  type SwitchAccountMenuProps
} from "@/components/user/switch-account-menu"
// User Avatar
export { UserAvatar, type UserAvatarProps } from "@/components/user/user-avatar"
// User Button
export { UserButton, type UserButtonProps } from "@/components/user/user-button"
// User View
export { UserView, type UserViewProps } from "@/components/user/user-view"

// ============================================
// Settings Components
// ============================================

// Account Settings Components
export {
  Appearance,
  type AppearanceProps,
  ChangeEmail,
  type ChangeEmailProps,
  ManageAccount,
  type ManageAccountProps,
  ManageAccounts,
  type ManageAccountsProps,
  UserProfile,
  type UserProfileProps
} from "@/components/settings/account"
// Theme Preview
export {
  ThemePreviewDark,
  ThemePreviewLight,
  ThemePreviewSystem
} from "@/components/settings/account/theme-preview"

// Security Settings Components
export {
  ActiveSessions,
  type ActiveSessionsProps,
  ChangePassword,
  type ChangePasswordProps,
  LinkedAccounts,
  type LinkedAccountsProps
} from "@/components/settings/security"
// Settings
export {
  AccountSettings,
  type AccountSettingsProps,
  SecuritySettings,
  type SecuritySettingsProps,
  Settings,
  type SettingsProps,
  type SettingsTab
} from "@/components/settings/settings"
