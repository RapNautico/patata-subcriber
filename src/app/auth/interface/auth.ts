export interface Auth {
    ok: boolean;
    uid?:      string;
    Email?:   string;
    Password?: string;
    token?: string;
    Message?: string;
}
