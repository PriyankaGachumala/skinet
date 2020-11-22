using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T> 
    {
        Expression<Func<T, bool>> Criteria {get;}
        //Criteria is what our where criteria is 
        List<Expression<Func<T, object>>> Includes {get;}
        
    }
}