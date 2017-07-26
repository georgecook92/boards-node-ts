import DecodedDTO from '../DTO/DecodedDTO';

declare global {
    namespace Express {
        export interface Request {
            decoded: DecodedDTO
        }
    }
}