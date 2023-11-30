import * as yup from "yup";
import moment from "moment";

export const chatSchema = yup.object().shape({
    content: yup
        .string()
        .max(100, "Message is too long!")
});