﻿// <auto-generated />
using EmployeeRegisterAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmployeeRegisterAPI.Migrations
{
    [DbContext(typeof(EmployeeDbContext))]
    partial class EmployeeDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.26")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("EmployeeRegisterAPI.EmployeeModel.EmployeeModel", b =>
                {
                    b.Property<int>("EmployeeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeID"), 1L, 1);

                    b.Property<string>("EmployeeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("ImageName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Occupation")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("EmployeeID");

                    b.ToTable("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}
