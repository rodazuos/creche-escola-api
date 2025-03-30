create table kindergarten (
    id integer primary key generated always as identity,
    cnpj varchar(300) not null,
    kindergarten_name varchar(300) not null,
    description varchar(1000) null,
    photo varchar(300) null,
    instagram varchar(300) null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table type_account (
	id integer primary key generated always as identity,
	account_name varchar(300) not null,
	created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

insert into type_account ( account_name) values ('Administrador');

create table users (
    id integer primary key generated always as identity,
    id_kindergarten integer references kindergarten(id),
    id_type_account integer references type_account(id),
    cpf varchar(11) not null,
    user_name varchar(300) not null,
    user_password varchar(300) not null,
    photo varchar(300) null,
    access_system boolean not null default false,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table user_address (
    id integer primary key generated always as identity,
    id_user integer references users(id),
    address varchar(300) not null,
    address_number varchar(30) not null,
    address_complement varchar(100) null,
    zipcode varchar(30) not null,
    city varchar(100) not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table user_contacts (
    id integer primary key generated always as identity,
    id_user integer references users(id),
    email varchar(300) null,
    house_phone_number varchar(30) null,
    personal_phone_number varchar(30) not null,
    commercial_phone_number varchar(30) null,
    contact_description varchar(300) null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table student (
    id integer primary key generated always as identity,
    cpf varchar(11) not null,
    student_name varchar(300) not null,
    photo varchar(300) null,
    birthdate timestamp not null,
    entry_time time not null,
    deperture_time time not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table user_student (
    id integer primary key generated always as identity,
    id_user integer references users(id),
    id_student integer references student(id),
    can_pick_up boolean not null,
    receive_notification boolean not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table students_class (
    id integer primary key generated always as identity,
    class_name varchar(300) not null,
    description varchar(300) not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table class_school_year (
    id integer primary key generated always as identity,
    school_year integer not null,
    id_students_class integer references students_class(id),
    start_time time not null,
    end_time time not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table calendar (
    id integer primary key generated always as identity,
    event_date timestamp not null,
    title varchar(300) not null,
    description varchar(1000) null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table students_class_school_year (
    id_class_school_year integer references class_school_year(id),
    id_student integer references student(id),
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table menu_class (
	id integer primary key generated always as identity,
	id_user integer references users(id),
	name_menu varchar(300) not null,
    description varchar(400) not null,
    hour_menu time not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table menu_class_school_year (
	id integer primary key generated always as identity,
	id_menu_class integer references menu_class(id),
    id_class_school_year integer references class_school_year(id),
    date_menu timestamp not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table student_daily (
	id integer primary key generated always as identity,
	id_student integer references student(id),
	date_daily timestamp not null,
	attended boolean not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table student_daily_notification (
	id integer primary key generated always as identity,
	id_student_daily integer references student_daily(id),
	id_user integer references users(id),
	description varchar(1000) not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table consumed_type_menu (
	id integer primary key generated always as identity,
	title varchar(100) not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);
insert into consumed_type_menu (title) values ('Recusou');
insert into consumed_type_menu (title) values ('Bem');
insert into consumed_type_menu (title) values ('Repetiu');
insert into consumed_type_menu (title) values ('Metade');
create table student_daily_menu (
	id integer primary key generated always as identity,
	id_student_daily integer references student_daily(id),
	id_menu_class_school_year integer references menu_class_school_year(id),
	id_consumed_type_menu integer references consumed_type_menu(id),
	description varchar(1000) null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table routine_type (
	id integer primary key generated always as identity,
	title varchar(100) not null,
	created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);
insert into routine_type (title) values ('Sono');
insert into routine_type (title) values ('Evacuação');
insert into routine_type (title) values ('Banho');

create table routine_type_detail (
	id integer primary key generated always as identity,
	id_routine_type integer references routine_type(id),
	title varchar(100) not null,
	created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);
insert into routine_type_detail (id_routine_type, title) values (1, 'N/A');
insert into routine_type_detail (id_routine_type, title) values (2, 'Normal');
insert into routine_type_detail (id_routine_type, title) values (2, 'Líquida');
insert into routine_type_detail (id_routine_type, title) values (2, 'Pastosa');
insert into routine_type_detail (id_routine_type, title) values (2, 'Não evacuou');
insert into routine_type_detail (id_routine_type, title) values (3, 'N/A');

create table student_daily_routine (
	id integer primary key generated always as identity,
	id_student_daily integer references student_daily(id),
	id_routine_type integer references routine_type(id),
	id_routine_type_detail integer references routine_type_detail(id),
	start_hour_routine time not null,
	end_hour_routine time not null,
	description varchar(1000) null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table student_medicament (
	id integer primary key generated always as identity,
	id_user integer references users(id),
	id_student integer references student(id),
	medicament varchar(500) not null,
	dosage varchar(100) not null,
	description varchar(1000) null,
	start_time timestamp not null,
	end_time timestamp not null,
	created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

-- Para todos os responsáveis | Para responsáveis de uma turma | Para responsáveis de um aluno
create table notification (
	id integer primary key generated always as identity,
	id_user integer references users(id),
	notification_date timestamp not null,
    title varchar(300) not null,
	description varchar(2000) not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table user_notification (
    id integer primary key generated always as identity,
	id_notification integer references notification(id),
	id_user integer references users(id),
	read_notification boolean not null,
    created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table classroom (
	id integer primary key generated always as identity,
	title varchar(300) not null,
	description varchar(1000) null,
	teacher varchar(300) not null,
	created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);

create table classroom_class_school_year (
	id integer primary key generated always as identity,
	id_classroom integer references classroom(id),
	id_class_school_year integer references class_school_year(id),
	weekday varchar(100) not null,
	start_time time not null,
	end_time time not null,
	created_at timestamp default timezone('utc', now()),
    updated_at timestamp,
    deleted_at timestamp
);
