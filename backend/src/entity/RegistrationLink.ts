import { PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, Column, CreateDateColumn } from "typeorm";
import { Group } from "./Group";
import { Course } from "./Course";

@Entity()
export class RegistrationLink {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public uid: string;

    @Column()
    public active: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;

    @JoinTable()
    @ManyToMany(() => Group, group => group.registrationLinks)
    public groups: Group[];

    @JoinTable()
    @ManyToMany(() => Course, course => course.registrationLinks)
    public courses: Course[];

    constructor(link: Partial<RegistrationLink>) {
        !!link && Object.assign(this, link);
    }
}
