import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";

/**
 * O que um decorator faz:
 * É declarado por um @, e basicamente, é uma "função" e coloca como
 * parâmetro o elemento logo abaixo do mesmo, no caso de Entity, ele colocou uma
 * classe como parametro dessa função.
 *
 * Para dizer que algo é uma entidade no banco de dados, basta
 * adicionar o decotator em cima da classe desejada, e pronto, agora ele é uma
 * tabela no banco.
 *
 * A mesma coisa, para dizer que uma propriedade do objeto é uma coluna do banco,
 * chama-se apenas o decorator correspondente.
 *
 * -> Tipos de relacionamentos
 * Um para Um (OneToOne)
 * Um para Muitos (OneToMany)
 */

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column() // Por padrão, já fica como string / varchar.
  provider_id: string;

  // Aqui no Appointments, definimos o relacionamento que o mesmo irá
  // possuir, como é partindo que varios agendamentos irão possuir um
  // unico usuário, então fazemos um ManyToOne
  // Criando as informações de relacionamento entre duas tabelas.
  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User;

  @Column("timestamp with time zone") // Somente com postgress.
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  // Não é mais necessário a utilização no constructor.
  // Quando se cria uma entidade do TypeORM, o constructor e criado de forma automática.
  // Para criar registro, o typeORM utiliza outros métodos (que não são os tradicionais);
  // constructor({ provider, date }: Omit<Appointment, "id">) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
