import db_client from "../configs/cosmos";

export const getDoc = (currentDatabase: string, currentContainer: string) => {
    const database = db_client.database(currentDatabase);
    const container = database.container(currentContainer);
    return container
}