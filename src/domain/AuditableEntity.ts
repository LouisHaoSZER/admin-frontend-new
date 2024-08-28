export abstract class AuditableEntity {
  protected readonly id = Symbol('AuditableEntity')
  protected readonly createdAt = new Date()

  is(other: AuditableEntity): boolean {
    return this.id === other.id
  }
}
