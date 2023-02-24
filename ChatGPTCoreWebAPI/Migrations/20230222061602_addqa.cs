using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatGPTCoreWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class addqa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Text",
                table: "messages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "messages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
