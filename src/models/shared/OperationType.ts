
enum OperationType {
    CALL = "CALL",
    EMAIL = "EMAIL",
    ONLINE_MEETING = "ONLINE_MEETING",
    IN_PERSON_MEETING = "IN_PERSON_MEETING"
}

const operationTypeList = [
    { label: "Call", value: OperationType.CALL},
    { label: "Email", value: OperationType.EMAIL},
    { label: "Online Meeting", value: OperationType.ONLINE_MEETING},
    { label: "In Person Meeting", value: OperationType.IN_PERSON_MEETING}
];

export { OperationType, operationTypeList }
