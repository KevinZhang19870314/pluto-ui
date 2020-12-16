import { Observable } from "rxjs/internal/Observable";

/**
 * @ignore
 */
// @dynamic
export class Utils {
    static hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static ID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    static objEqual(a: any, b: any) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    static toBoolean(value: any): boolean {
        return value != null && `${value}` !== 'false';
    }

    static checkImgWidthAndHeight(file: any, maxWidth: number, maxHeight: number) {
        return Observable.create((observer: any) => {
            let isAllow = false;
            if (file) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    let data = e.target.result;
                    let image = new Image();
                    image.onload = () => {
                        let width = image.width;
                        let height = image.height;
                        isAllow = width === maxWidth && height === maxHeight;
                        observer.next(isAllow);
                        observer.complete();
                    };
                    image.src = data;
                };

                reader.readAsDataURL(file);
            }
        });
    }

    static compareValues(key: string, order: 'asc' | 'desc' = 'asc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }
}