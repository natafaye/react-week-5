
const UPLOAD_ENDPOINT = 'http://something';

export const uploadFile = async (filesData) => {
    try {
        const resp = await fetch(UPLOAD_ENDPOINT, { method: "POST", body: filesData });
        return await { 
            success: true, 
            data: resp.json() 
        };
    }
    catch(e) {
        console.log(e);
        return {
            success: false,
            data: e
        }
    }
}