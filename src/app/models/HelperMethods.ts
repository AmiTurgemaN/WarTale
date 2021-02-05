export class HelperMethods {
    public static GetTimeLeftInSeconds(hellGateTimeLeft: string) {
        var splitTimeLeft = hellGateTimeLeft.split(":");
        return (Number(splitTimeLeft[2]))
                +(Number(splitTimeLeft[1]) *60 )
                +(Number(splitTimeLeft[0]) * 3600 );
    }

    public static DisplayIn2DigitsFormat(num: Number) {
        return ("0" + num).slice(-2);
    }

    public static Delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static GetTimeLeftValue(seconds: number) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor(seconds % 3600 / 60);
        var seconds = Math.floor(seconds % 3600 % 60);
        return `${HelperMethods.DisplayIn2DigitsFormat(hours)}:${HelperMethods.DisplayIn2DigitsFormat(minutes)}:${HelperMethods.DisplayIn2DigitsFormat(seconds)}`;
      }

}