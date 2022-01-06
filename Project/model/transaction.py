from enum import Enum


class Transaction(Enum):
    PENDING = "PENDING"
    SUCCESSFUL = "SUCCESSFUL"
    DENIED = "DENIED"
