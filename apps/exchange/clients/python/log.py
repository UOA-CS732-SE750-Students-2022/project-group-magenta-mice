from enum import Enum
from typing import Any
from traceback import print_exc


class Colors:
    # Foreground
    F_Default = "\x1b[39m"
    F_Black = "\x1b[30m"
    F_Red = "\x1b[31m"
    F_Green = "\x1b[32m"
    F_Yellow = "\x1b[33m"
    F_Blue = "\x1b[34m"
    F_Magenta = "\x1b[35m"
    F_Cyan = "\x1b[36m"
    F_LightGray = "\x1b[37m"
    F_DarkGray = "\x1b[90m"
    F_LightRed = "\x1b[91m"
    F_LightGreen = "\x1b[92m"
    F_LightYellow = "\x1b[93m"
    F_LightBlue = "\x1b[94m"
    F_LightMagenta = "\x1b[95m"
    F_LightCyan = "\x1b[96m"
    F_White = "\x1b[97m"
    # bg
    B_White = "\x1b[107m"
    B_Default = "\x1b[49m"


class LogLevel(Enum):
    TRACE = 4
    INFO = 3
    WARN = 2
    ERROR = 1
    CRITICAL = 0
    OFF = -1


class Log:

    logLevel: int = 0

    @staticmethod
    def setLogLevel(level: LogLevel) -> None:
        Log.logLevel = level.value

    @staticmethod
    def trace(m: Any) -> None:
        if Log.logLevel >= 4:
            print(f"{Colors.F_LightGray}{m}{Colors.F_Default}")

    @staticmethod
    def info(m: Any) -> None:
        if Log.logLevel >= 3:
            print(f"{Colors.F_Green}{m}{Colors.F_Default}")

    @staticmethod
    def success(m: Any) -> None:
        if Log.logLevel >= 3:
            print(f"{Colors.F_Magenta}{m}{Colors.F_Default}")

    @staticmethod
    def warn(m: Any) -> None:
        if Log.logLevel >= 2:
            print(f"{Colors.F_Yellow}{m}{Colors.F_Default}")

    @staticmethod
    def error(m: Any) -> None:
        if Log.logLevel >= 1:
            print(f"{Colors.F_Red}{m}{Colors.F_Default}")

    @staticmethod
    def critical(m: Any) -> None:
        if Log.logLevel >= 0:
            print_exc()
            print(
                f"{Colors.F_Red}{Colors.B_White}{m}{Colors.F_Default}{Colors.B_Default}"
            )


trace = Log.trace
info = Log.info
success = Log.success
warn = Log.warn
error = Log.error
critical = Log.critical
