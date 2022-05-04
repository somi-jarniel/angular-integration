export class WorkspaceModel {
    
    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    private _name: string;

    private _description: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name =  value.replace(/\b\w/g, function(l){ return l.toUpperCase() });
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}