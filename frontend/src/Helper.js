// Random helper functions
//  - getLastItemOfObject

export default class Helper {

  getLastItemOfObject(obj) {
    return obj[Object.keys(obj)[Object.keys(obj).length - 1]] 
  }

  
}