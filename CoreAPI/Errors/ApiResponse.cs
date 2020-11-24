using System;

namespace CoreAPI.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string errorMessage= null)
        {
            StatusCode = statusCode;
            ErrorMessage = errorMessage ?? GetDefaultMessageForStatusCode(statusCode);
        }
        
        public int StatusCode { get; set; }
        public string ErrorMessage { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch 
            {
                400 => "Bad request was made",
                401=>"Unauthorized",
                404=>"Resource not found",
                500=>"Server Error.",
                _=>null
            };
        }
    }
}