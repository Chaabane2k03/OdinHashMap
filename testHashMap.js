class HashMap {
    constructor(capacity = 16) {
        this.buckets = new Array(capacity).fill(null).map(() => []);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    set(key, value) {
        const index = Math.abs(this.hash(key) % this.buckets.length);
        const bucket = this.buckets[index];

        for (let entry of bucket) {
            if (entry[0] === key) {
                entry[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.buckets.length > 0.75) {
            this.resize(this.buckets.length * 2);
        }
    }

    get(key) {
        const index = Math.abs(this.hash(key) % this.buckets.length);
        const bucket = this.buckets[index];

        for (let entry of bucket) {
            if (entry[0] === key) {
                return entry[1];
            }
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = Math.abs(this.hash(key) % this.buckets.length);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const keys = [];
        for (let bucket of this.buckets) {
            for (let entry of bucket) {
                keys.push(entry[0]);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let bucket of this.buckets) {
            for (let entry of bucket) {
                values.push(entry[1]);
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (let bucket of this.buckets) {
            for (let entry of bucket) {
                entries.push(entry);
            }
        }
        return entries;
    }

    resize(newCapacity) {
        const oldBuckets = this.buckets;
        this.buckets = new Array(newCapacity).fill(null).map(() => []);
        this.size = 0;

        for (let bucket of oldBuckets) {
            for (let entry of bucket) {
                this.set(entry[0], entry[1]);
            }
        }
    }
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');

console.log(test.get('apple')); // Output: 'red'
console.log(test.get('banana')); // Output: 'yellow'
console.log(test.get('carrot')); // Output: 'orange'
console.log(test.get('dog')); // Output: 'brown'
