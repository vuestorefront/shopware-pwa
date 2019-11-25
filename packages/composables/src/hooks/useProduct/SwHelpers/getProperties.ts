export default function getProperties(product){
  if (!product.properties) {
    return []
  }

  const propertyList = product.properties.map(property => ({
    name: property.group.name,
    value: property.name
  }))

  return propertyList
}