export abstract class Model<T> {}

export interface IModelConstructor<T extends Model<T>> {
    new (...args: any[]): Model<T>
}
