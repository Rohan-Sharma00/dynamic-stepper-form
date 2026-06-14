function DynamicField({ field }) {
  return <div>{field?.label}</div>;
}

export default DynamicField;