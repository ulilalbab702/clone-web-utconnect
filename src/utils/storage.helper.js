const getStorage = key => {
    try {
      if (key) {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
      }
      return {};
    } catch (err) {
      return {};
    }
  };

const setStorage = async (key,payload) => {
    try {
        if (key && payload) {
            const data = JSON.stringify(payload);
            await localStorage.setItem(key,data);    
        }
    } catch (err) {
        
    }
};
export {setStorage,getStorage};