import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  student_id: z.number(),
  professor_id: z.number(),
  description: z.string().min(2).max(50),
  date: z.date(),
});

export default function AppointentForm({ onSubmit }: any) {
  const [professors, setProfessors] = useState<any[]>([]);
  const [professor, setProfessor] = useState<any[]>([]);
  const [professorDates, setProfessorDates] = useState<any[]>([]);
  const [date, setDate] = useState(new Date());

  const be_endpoint = "localhost:4000";
  const api_reference = "professors";

  async function fetchProfessors() {
    const { data } = await axios.get(`http://${be_endpoint}/${api_reference}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setProfessors(data);
  }

  async function fetchProfessorDates(professor_id: any) {
    setProfessor(professor_id);
    const { data } = await axios.get(
      `http://${be_endpoint}/professors/meeting_dates/${professor_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setProfessorDates(data);
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: 1,
      professor_id: 1,
      description: "",
      date: new Date(),
    },
  });

  const handleSubmit = (appointment: any) => {
    appointment.date = date;
    appointment.professor_id = professor;
    onSubmit(appointment);
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{field.name} pretend to be student 1</FormLabel>
                <FormControl>
                  <Input value="1" disabled={true} defaultValue="1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="professor_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Select onValueChange={(val) => fetchProfessorDates(val)}>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Some description here"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Selet meeting date</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(newDate) => setDate(new Date(newDate))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder="-- Selet meeting date --"
                        className="w-full"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {professorDates.map((date) => (
                        <SelectItem value={date} key={date}>
                          {date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
}
