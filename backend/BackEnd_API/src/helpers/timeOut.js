export default function timeoutPromise(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout occurred'));
        }, timeout);
    })}