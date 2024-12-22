import ejs from "ejs";
import path from "path";
import { ZodError } from "zod";

export const formatError = (error: ZodError): any => {
  let errors: any = {};
  error.errors?.map((issue) => {
    errors[issue.path?.[0]] = issue.message;
  });

  return errors;
};

export const renderEmailEJS = async (fileName: string, data: any) => {
  const html = await ejs.renderFile(
    path.join(__dirname, `views/emails/${fileName}.ejs`),
    data
  );

  return html;
};
