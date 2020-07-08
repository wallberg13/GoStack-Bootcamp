import React, { useState, useCallback, useEffect, useMemo } from "react";
import { isToday, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";

import { FiPower, FiClock } from "react-icons/fi";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar
} from "./styles";

import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

// Nunca iremos manipular / criar variaveis normais em tempo de renderizaçãos

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  // selectDate faz com que a exibição dos agendamentos sejam para o dia selecionado
  const [selectedDate, setSelectedDate] = useState(new Date());

  // currentMonth faz com que o calendário mostre os dias disponíveis daquele mês para aquele provider
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Array com a disponibilidade dos dias do mês (na vdd, para o prestador de serviço, deve aparecer o contrario)
  // do que essa rotina prega.
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // Carregando os dias disponíveis no mês.
  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1
        }
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // Carregando os Appointments
  useEffect(() => {
    api
      .get(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      });
  }, [selectedDate, user.id]);

  // Serve para memorizar uma formato / valor especifico
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          monthDay.day
        );
        return date;
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, "cccc", { locale: ptBR });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/8339296?s=400&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
                alt="Wall Berg Morais"
              />

              <strong>Wall Berg Morais</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock /> 8:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/8339296?s=400&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
                  alt="Wall Berg Morais"
                />
                <strong>Wall Berg Morais</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock /> 8:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/8339296?s=400&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
                  alt="Wall Berg Morais"
                />
                <strong>Wall Berg Morais</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock /> 8:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/8339296?s=400&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
                  alt="Wall Berg Morais"
                />
                <strong>Wall Berg Morais</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock /> 8:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/8339296?s=400&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
                  alt="Wall Berg Morais"
                />
                <strong>Wall Berg Morais</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock /> 8:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/8339296?s=400&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
                  alt="Wall Berg Morais"
                />
                <strong>Wall Berg Morais</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro"
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
