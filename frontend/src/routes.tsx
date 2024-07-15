import type { ReactNode } from "react";
import Appointents from "@/routes/appointments";
import PendingAppointents from "./routes/pending_appointments";

export const pathroutes = {
  //
  /**
   * Add here your paths with elements:
   * example:
   *  '/login': <Login />
   */
  "/appointments": <Appointents />,
  "/pending_appointments": <PendingAppointents />,
} satisfies Record<string, ReactNode>;

export default pathroutes;
