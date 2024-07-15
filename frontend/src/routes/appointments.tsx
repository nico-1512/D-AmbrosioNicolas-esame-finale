import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import AppointentForm from "@/components/custom/appointment_form";

export default function Appointents() {
  const [appointments, setAppointments] = useState<any[]>([]);

  const be_endpoint = "localhost:4000";
  const api_reference = "appointments";

  async function fetchAppointments() {
    const { data } = await axios.get(`http://${be_endpoint}/${api_reference}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAppointments(data);
  }

  async function CreateAppointment(appointment: any) {
    await axios
      .post(`http://${be_endpoint}/${api_reference}`, appointment)
      .then(() => {
        fetchAppointments();
      });
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Table>
        <TableCaption>Lista appuntamenti</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Id Studente</TableHead>
            <TableHead>Id Professore</TableHead>
            <TableHead>Data e Ora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={index + 1}>
              <TableCell className="font-medium">{appointment?.id}</TableCell>
              <TableCell>{appointment?.student_id}</TableCell>
              <TableCell>{appointment?.professor_id}</TableCell>
              <TableCell>{appointment?.date}</TableCell>
              <TableCell className="flex flex-row gap-x-5 justify-end items-end"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog>
        <AlertDialogTrigger className="bg-blue-600 hover:bg-blue-500 w-[200px] mt-10 rounded h-[40px] text-white">
          Aggiungi nuovo
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add new appointment</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AppointentForm onSubmit={CreateAppointment} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
