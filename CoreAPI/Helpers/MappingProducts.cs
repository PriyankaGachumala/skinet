using AutoMapper;
using Core.Models;
using CoreAPI.DTO;

namespace CoreAPI.Helpers
{
    public class MappingProducts : Profile
    {
        public MappingProducts()
        {
            CreateMap<Product, ProductToReturn>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.ImageUrl, o => o.MapFrom<ProductImageUrlResolver>());
            /*
            d->destination
            o->options
            s->source
            */
        }
    }
}