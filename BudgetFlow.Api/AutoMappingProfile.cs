using AutoMapper;
using BudgetFlow.Api.Dtos;
using BudgetFlow.Api.Models;

namespace BudgetFlow.Api
{
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            // Add your mapping configurations here

            // GET Category
            CreateMap<Category, CategoryDto>();

            // POST Category
            CreateMap<AddCategoryDto, Category>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore());

            // GET Transaction
            CreateMap<Transaction, TransactionDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));

            // POST Transaction
            CreateMap<AddTransactionDto, Transaction>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Category, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore());
        }
    }
}
