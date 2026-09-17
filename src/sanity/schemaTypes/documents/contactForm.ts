import { defineField, defineType } from "sanity";
import { languageField } from "../shared";

/** Labels, placeholders and messages for the contact form, per language. */
export default defineType({
  name: "contactForm",
  title: "Contact form texts",
  type: "document",
  fields: [
    defineField({ name: "nameLabel", title: "Name label", type: "string" }),
    defineField({ name: "companyLabel", title: "Company label", type: "string" }),
    defineField({ name: "emailLabel", title: "Email label", type: "string" }),
    defineField({ name: "taskLabel", title: "Task label", type: "string" }),
    defineField({ name: "taskPlaceholder", title: "Task placeholder", type: "string" }),
    defineField({ name: "timelineLabel", title: "Timeline / budget label", type: "string" }),
    defineField({ name: "languageLabel", title: "Preferred language label", type: "string" }),
    defineField({ name: "submitLabel", title: "Button label", type: "string" }),
    defineField({ name: "privacyNote", title: "Note next to the button", type: "string" }),
    defineField({ name: "requiredError", title: "“Required” error", type: "string" }),
    defineField({ name: "emailError", title: "“Invalid email” error", type: "string" }),
    defineField({ name: "sendError", title: "Sending failed message", type: "string" }),
    defineField({ name: "successTitle", title: "Thank-you heading", type: "string" }),
    defineField({ name: "successText", title: "Thank-you text", type: "text", rows: 3 }),
    defineField({ name: "successSteps", title: "What happens next", type: "array", of: [{ type: "string" }] }),
    languageField,
  ],
  preview: { select: { subtitle: "language" }, prepare: ({ subtitle }) => ({ title: "Contact form", subtitle }) },
});
