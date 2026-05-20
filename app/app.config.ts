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
        base: "font-bold uppercase text-ui-text bg-zinc-200 rounded-sm  ",
        label: "truncate",
      },
      defaultVariants: {
        color: "",
        variant: "",
        size: "sm",
      },
    },
    button: {
      slots: {
        base: " dark:bg-grays-950 dark:text-white capitalize transition dark:hover:bg-grays-950/60 dark:hover:text-slate-50/80",
      },
      defaultVariants: {
        color: "",
        variant: "",
        size: "md",
      },
   },
   input: {
    slots: {
      base: "dark:bg-grays-950 dark:text-white placeholder:text-grays-200",
      leadingIcon: "text-grays-300"
    },
    defaultVariants: {
      color: "",
      variant: "",
      size: "md"
    }
   },
   modal:{
    variants:{
      fullscreen: {
        false:{
          content: 'w-[calc(100vw-2rem)] max-w-2xl h-180 rounded-sm shadow-lg  dark:bg-grays-900 bg-white overflow-y-scroll'
        }
      }
    }
   }
  },
});
