export default defineAppConfig({
  ui: {
    
    colors: {
      primary: "red",
      neutral: "grays",
    },
    table: {
      slots: {
        base: "bg-white text-default rounded-md",
        th: "text-ui-text capitalize",
        thead: "text-grays-900 bg-grays-50",
        td: "text-grays-600",
        tr: "border-0",
        separator: "bg-transparent",
      },
    },
    badge: {
      slots: {
        base: "font-semibold capitalize text-ui-text bg-zinc-200 rounded-sm  ",
        label: "truncate",
      },
      defaultVariants: {
        color: "",
        variant: "",
        size: "md",
      },
    },
    button: {
      slots: {
        base: "bg-grays-800 text-white capitalize",
      },
      defaultVariants: {
        color: "",
        variant: "",
        size: "md",
      },
   },
   input: {
    slots: {
      base: "bg-grays-900 text-white placeholder:text-grays-200",
      leadingIcon: "text-grays-300"
    },
    defaultVariants: {
      color: "",
      variant: "",
      size: "md"
    }
   }
  },
});
