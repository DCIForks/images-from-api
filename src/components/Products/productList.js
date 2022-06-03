const getProductList = async () => {
  // Use your own host and key data here
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com',
      'X-RapidAPI-Key': '00483729e8msh44ad522f9eeae9fp130f74jsnbb44d016f1e1'
    }
  };

  // Customize filter terms (perhaps with a form and useContext)
  const country    = "US"
  const store      = "US"
  const sizeSchema = "US"
  const currency   = "USD"
  const lang       = "en-US"
  const categoryId = 4209
  const offset     = 0
  const sort       = "freshness"
  const limit      = 48

  const baseURL = "https://asos2.p.rapidapi.com/products/v2/list"

  // Generate request url from filter terms
  const filter = {
    country,
    store,
    sizeSchema,
    currency,
    lang,
    categoryId,
    offset,
    sort,
    limit
  }
  const keys = Object.keys(filter)

  const url = keys.reduce(( url, key, index ) => {
    const value = filter[key]
    return url + (index ? "&" : "?") + key+"="+value
  }, baseURL)

  // console.log("url:", url);
  // https://asos2.p.rapidapi.com/products/v2/list?country=US&store=US&sizeSchema=US&currency=USD&lang=en-US&categoryId=4209&offset=0&sort=freshness&limit=48

  const response = await fetch(url, options)
  return response.json()
}


export default getProductList