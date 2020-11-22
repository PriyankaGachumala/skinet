namespace CoreAPI.DTO
{
    public class ProductToReturn
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        //ProductType is related entities
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }

    }
}