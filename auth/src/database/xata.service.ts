import { env } from 'hono/adapter';
import { XataClient } from '../xata';
import { Context } from 'hono';

export class XataService {
    private readonly XATA_CLIENT;
    private static instance: XataService;

    private constructor(c: Context) {
        const { XATA_API_KEY, XATA_BRANCH } = env<{ XATA_API_KEY: string, XATA_BRANCH: string }>(c)
        this.XATA_CLIENT = new XataClient({
            apiKey: XATA_API_KEY,
            branch: XATA_BRANCH
        })
    }

    public static getInstance(c: Context): XataService {
        if (!XataService.instance) {
            XataService.instance = new XataService(c);
        }
        return XataService.instance;
    }

    public getXataClient(): XataClient {
        return this.XATA_CLIENT;
    }
}
