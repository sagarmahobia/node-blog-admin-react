class NetworkState {
}

class NetworkStateInitial extends NetworkState {


    toString(): string {
        return "NetworkStateInitial";
    }
}

class NetworkStatePending extends NetworkState {

        toString(): string {
            return "NetworkStatePending";
        }
}

class NetworkStateSuccess<T> extends NetworkState {

    data: T | null = null;

    constructor(data: T) {
        super();
        this.data = data;
    }

    toString(): string {
        return "NetworkStateSuccess";
    }

}

class NetworkStateError extends NetworkState {

    error: any | null = null;
    message: string | null = null;

    constructor(error: any | null, message: string | null) {
        super();
        this.error = error;
        this.message = message;
    }

    toString(): string {
        return "NetworkStateError";
    }
}

export {NetworkState, NetworkStateInitial, NetworkStatePending, NetworkStateSuccess, NetworkStateError};
