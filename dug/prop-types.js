const isValidUrl = (url) => {
  console.log('Checking URL:', url);  // Add this line to confirm the URL being passed
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const UrlPropType = (props, propName, componentName) => {
  const value = props[propName];
  
  if (value === undefined || value === null || value === '') {
    return new Error(`Missing or empty URL '${propName}' in '${componentName}'. URL is required.`);
  }
  if (typeof value !== 'string' || !isValidUrl(value)) {
    console.error(`Invalid URL '${value}' supplied to '${componentName}'.`);
    return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Must be a valid URL.`);
  }
  return null;
};
