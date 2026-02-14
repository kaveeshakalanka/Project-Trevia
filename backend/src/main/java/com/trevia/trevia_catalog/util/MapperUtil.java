package com.trevia.trevia_catalog.util;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.trevia.trevia_catalog.dto.CategoryDTO;
import com.trevia.trevia_catalog.dto.OrderDTO;
import com.trevia.trevia_catalog.dto.OrderItemDTO;
import com.trevia.trevia_catalog.dto.ProductDTO;
import com.trevia.trevia_catalog.dto.SignupRequest;
import com.trevia.trevia_catalog.dto.UserDTO;
import com.trevia.trevia_catalog.entity.Category;
import com.trevia.trevia_catalog.entity.Order;
import com.trevia.trevia_catalog.entity.OrderItem;
import com.trevia.trevia_catalog.entity.Product;
import com.trevia.trevia_catalog.entity.User;

@Component
public class MapperUtil {

    @Autowired
    private ModelMapper modelMapper;

    public <S, D> D map(S source, Class<D> destinationType) {
        if (source == null)
            return null;
        return modelMapper.map(source, destinationType);
    }

    public <S, D> List<D> mapList(List<S> sourceList, Class<D> destinationType) {
        if (sourceList == null)
            return null;
        return sourceList.stream()
                .map(source -> map(source, destinationType))
                .collect(Collectors.toList());
    }

    public <S, D> Page<D> mapPage(Page<S> sourcePage, Class<D> destinationType) {
        if (sourcePage == null)
            return null;
        return sourcePage.map(source -> map(source, destinationType));
    }

    public <S, D> void map(S source, D destination) {
        if (source != null && destination != null) {
            modelMapper.map(source, destination);
        }
    }

    // User
    public UserDTO toUserDTO(User user) {
        return map(user, UserDTO.class);
    }

    public User toUserEntity(SignupRequest request) {
        return map(request, User.class);
    }

    public List<UserDTO> toUserDTOList(List<User> users) {
        return mapList(users, UserDTO.class);
    }

    // Product
    public ProductDTO toProductDTO(Product product) {
        return map(product, ProductDTO.class);
    }

    public Product toProductEntity(ProductDTO dto) {
        return map(dto, Product.class);
    }

    public List<ProductDTO> toProductDTOList(List<Product> products) {
        return mapList(products, ProductDTO.class);
    }

    public Page<ProductDTO> toProductDTOPage(Page<Product> productPage) {
        return mapPage(productPage, ProductDTO.class);
    }

    // Category
    public CategoryDTO toCategoryDTO(Category category) {
        return map(category, CategoryDTO.class);
    }

    public Category toCategoryEntity(CategoryDTO dto) {
        return map(dto, Category.class);
    }

    public List<CategoryDTO> toCategoryDTOList(List<Category> categories) {
        return mapList(categories, CategoryDTO.class);
    }

    // Order
    public OrderDTO toOrderDTO(Order order) {
        return map(order, OrderDTO.class);
    }

    public Order toOrderEntity(OrderDTO dto) {
        return map(dto, Order.class);
    }

    public List<OrderDTO> toOrderDTOList(List<Order> orders) {
        return mapList(orders, OrderDTO.class);
    }

    public Page<OrderDTO> toOrderDTOPage(Page<Order> orderPage) {
        return mapPage(orderPage, OrderDTO.class);
    }

    // OrderItem
    public OrderItemDTO toOrderItemDTO(OrderItem orderItem) {
        return map(orderItem, OrderItemDTO.class);
    }

    public List<OrderItemDTO> toOrderItemDTOList(List<OrderItem> orderItems) {
        return mapList(orderItems, OrderItemDTO.class);
    }

    @Configuration
    public static class ModelMapperConfig {

        @Bean
        public ModelMapper modelMapper() {
            ModelMapper mapper = new ModelMapper();

            mapper.getConfiguration()
                    .setMatchingStrategy(MatchingStrategies.STRICT)
                    .setSkipNullEnabled(true)
                    .setAmbiguityIgnored(true);

            return mapper;
        }
    }
}
