class MyNode<T> {
    private readonly _value: T;
    private _next: MyNode<T> | null;

    public get value(): T{
        return this._value;
    }

    public get next(){
        return this._next;
    }

    public set next(next: MyNode<T> | null) {
        if (next === this){
            throw new Error("circular dependency");
        }
        this._next = next;
    }

    constructor(value: T, next: MyNode<T> | null = null) {
        this._value = value;
        this._next = next;
    }
}

export class Queue<T> {
    private _head: MyNode<T> | null = null;
    private _tail: MyNode<T> | null = null;

    public enqueue(value: T): void {
        const newNode = new MyNode(value);
        if (this._head === null){
            this._head = newNode;
            this._tail = this._head;
            return;
        }

        newNode.next = this._head;
        this._head = newNode;
    }

    public dequeue(): T {
        if (this._tail === null || this._head === null){
            // to help the user avoid this a count property would be nice
            throw new Error("queue is empty");
        }

        // At this point we realize that adding at the tail and
        // removing at the head would be smarter for a queue.
        // Or we could do double-linked nodes as an exercise?
        let current = this._head;
        while (current.next != this._tail && current.next !== null){
            current = current.next;
        }
        current.next = null;
        const value = this._tail.value;
        if (current === this._tail){
            this._head = null;
            this._tail = null;
        } else {
            this._tail = current;
        }
        return value;
    }
}