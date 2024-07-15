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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PendingAppointents() {
  const [professors, setProfessors] = useState<any[]>([]);
  const [professor, setProfessor] = useState<any>();
  const [pendingAppointments, setPendingAppointments] = useState<any[]>([]);

  const be_endpoint = process.env.BACKEND_ENDPOINT ?? "localhost:4000";
  const api_reference = "pending_appointments";

  async function fetchPendingAppointments() {
    const { data } = await axios.get(`http://${be_endpoint}/${api_reference}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setPendingAppointments(data);
  }
  async function fetchProfessors() {
    const { data } = await axios.get(`http://${be_endpoint}/professors`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setProfessors(data);
  }

  async function handleAppointment(appointment: any, bool: boolean) {
    appointment.state = bool;
    await axios.post(`http://${be_endpoint}/pending_appointments`, appointment);
    fetchPendingAppointments();
  }

  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  useEffect(() => {
    fetchProfessors();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Select onValueChange={(prof) => setProfessor(prof)}>
        <SelectTrigger>
          <SelectValue placeholder="Professor" />
        </SelectTrigger>
        <SelectContent>
          {professors.map((professor) => (
            <SelectItem
              content={professor.first_name}
              value={professor.id}
              key={professor.id}
              className="w-full"
            >
              {professor.first_name} {professor.last_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {professor ? (
        <Table>
          <TableCaption>Lista in attesa appuntamenti</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id Appuntamento</TableHead>
              <TableHead>Id Professore</TableHead>
              <TableHead>Data e Ora</TableHead>
              <TableHead>Stato</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingAppointments.map((appointment, index) => {
              if (appointment.professor_id === professor) {
                return (
                  <TableRow key={index + 1}>
                    <TableCell>{appointment?.appointment_id}</TableCell>
                    <TableCell>{appointment?.professor_id}</TableCell>
                    <TableCell>{appointment?.date}</TableCell>
                    <TableCell>
                      {appointment?.state === false ? "False" : "True"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleAppointment(appointment, true)}
                      >
                        Confirm
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleAppointment(appointment, false)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
