using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatGPTCoreWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class addqaadd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "messages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Question",
                table: "messages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "messages");

            migrationBuilder.DropColumn(
                name: "Question",
                table: "messages");
        }
    }
}
