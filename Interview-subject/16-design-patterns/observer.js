
class Subject {
    constructor() {
        this.state = 0;
        this.observers = [];
    }
    getState() {
        return this.state;
    }
    setState(value) {
        this.state = value;
        this.notify();
    }
    notify() {
        this.observers.forEach(observer => {
            observer.update();
        });
    }
    attach(observer) {
        this.observers.push(observer);
    }
}


class Observer {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
        this.subject.attach(this);
    }
    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`);
    }
}


const sub = new Subject();
const observer1 = new Observer('ob1', sub);
const observer2 = new Observer('ob2', sub);

sub.setState(1);






