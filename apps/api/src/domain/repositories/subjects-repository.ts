import { Subject } from "../entities/subject";

export abstract class SubjectsRepository {
    abstract findWithSameName(name: string): Promise<Subject | null>
    abstract create(subject: Subject): Promise<void>
}