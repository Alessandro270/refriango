export default defineAppConfig({
  ui: {
    colors: {
      primary: "red",
      neutral: "grays",
    },
    table: {
      slots: {
        base: "bg-white text-default rounded-md",
        th: "text-grays-900",
        td: "text-grays-600",
        tr: "border-b border-grays-200",
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
  },
});
