import * as React from "react"

// Assumes 'cn' utility function is available at '@/lib/utils' for class name merging
import { cn } from "@/lib/utils" 

// 1. Card (Main Container)
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: rounded corners, border, white background (bg-card), default text color, light shadow
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// 2. CardHeader
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: flex column layout, vertical spacing, default padding (p-6)
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// 3. CardTitle (FIXED TYPE CONSISTENCY)
const CardTitle = React.forwardRef<
  // Changed ref type from HTMLParagraphElement to HTMLHeadingElement to match <h3>
  HTMLHeadingElement, 
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    // Styling: semi-bold font, no extra leading/tracking
    className={cn(
      "font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

// 4. CardDescription
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    // Styling: small text size, muted gray color
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

// 5. CardContent
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    // Styling: default padding, zero top padding (as the header usually provides separation)
    className={cn("p-6 pt-0", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

// 6. CardFooter
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Styling: centered alignment, default padding, zero top padding
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Export all components for easy use in other files
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
