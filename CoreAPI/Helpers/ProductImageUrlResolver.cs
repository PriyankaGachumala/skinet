using AutoMapper;
using Core.Models;
using CoreAPI.DTO;
using Microsoft.Extensions.Configuration;

namespace CoreAPI.Helpers
{
    public class ProductImageUrlResolver : IValueResolver<Product, ProductToReturn, string>
    {
        private readonly IConfiguration _config;
        public ProductImageUrlResolver(IConfiguration config)
        {
            _config = config;

        }

        public string Resolve(Product source, ProductToReturn destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ImageUrl))
            {
                return _config["ApiUrl"] + source.ImageUrl;
            }
            return null;

        }
    }
}