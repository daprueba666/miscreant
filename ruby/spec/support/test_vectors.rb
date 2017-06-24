# frozen_string_literal: true

require "tjson"

class AesCmacExample
  attr_reader :key, :input, :result

  # Error parsing the example file
  ParseError = Class.new(StandardError)

  # Default file to load examples from
  DEFAULT_EXAMPLES = File.expand_path("../../../../vectors/aes_cmac.tjson", __FILE__)

  def self.load_file(filename = DEFAULT_EXAMPLES)
    examples = TJSON.load_file(filename).fetch("examples")
    raise ParseError, "expected a toplevel array of examples" unless examples.is_a?(Array)

    examples.map { |example| new(example) }
  end

  def initialize(attrs)
    @key = attrs.fetch("key")
    @input = attrs.fetch("input")
    @result = attrs.fetch("result")
  end
end